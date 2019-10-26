pragma solidity ^0.5.8;
pragma experimental ABIEncoderV2;

contract Donation {
    
    // Project Status
    enum State {
        Fundraising,
        Expired,
        Successful,
        Cancel
    }
    
    // Instantiate a variable to hold the account address of the contract administrator
    address public owner;
    
    // Create a data structure to reperesent each of the donation.
    struct donation_struct{
        address don_address;
        string name;
        uint project_ID;
        uint amount;
        uint256 don_date;
    }
    // Create a data structure to reperesent each of the project.
    struct project_struct{
        address creator;
        string creator_name;
        string project_name;
        string descrption;
        uint current_Amount;
        uint goal_Amount;
        uint256 create_date;
        uint256 expired_date;
        State state;
    }
    // Create a data structure to reperesent each of the withdraw.
    struct withdraw_struct{
        uint project_ID;
        string project_name;
        address executor;
        string to_organization;
        string descrption;
        uint withdraw_amount;
        uint256 withdraw_date;
    }
    
    // Create a data structure to reperesent each of the participants.
    struct Payee {
        // If the payee can administer their account.
        bool status;
        // A record of the amount held for the payee.
        uint balance;
        // Record the personal doation data
        donation_struct[] payee_donation;
    }
    // Create a data structure to reperesent each of the participants.
    struct Fundraiser {
        // If the Fundraiser can administer their account.
        bool status;
        // A record of the amount held for the Fundraiser.
        uint balance;
        // Record the Fundraiser project data
        project_struct[] project_data;
        // Record the Fundraiser withdraw data
        //withdraw_struct[] withdraw_data;
    }
    
    
    
    // Create an associative arrays with account address as key and payee data sturcture as value.
    mapping(address => Payee) public payees;
    // Create an array like mapping to behave as an index of addreesses
    mapping (int8 => address) public payeesIndex;
    // Keep note of total number of participants in the system so we can iterate over index.
    int8 public payeesIndexSize;
    
    // Create an associative arrays with account address as key and payee data sturcture as value.
    mapping(address => Fundraiser) public fundraisers;
    // Create an array like mapping to behave as an index of addreesses
    mapping (int8 => address) public fundraiser_index;
    // Keep note of total number of participants in the system so we can iterate over index.
    int8 public fundraisersIndexSize;
    
    // donation data
    donation_struct[] public donation_data;
    // project data
    project_struct[] public project_data;
    // withdraw data
    withdraw_struct[] public withdraw_data;
    
    // delegate
    function delegate_fundraiser(address f_address) public{
        fundraisers[f_address].status = true;
        fundraisers[f_address].balance = 1000;
        fundraiser_index[0] = f_address;
        fundraisersIndexSize += 1;
    }

    function delegate_payee(address p_address) public{
        // Set the address of the contract deployer to be owner.
        //owner = msg.sender;
        payees[p_address].status = true;
        payees[p_address].balance = 1000;
        payeesIndex[0] = p_address;
        payeesIndexSize += 1;
    }
    
    function create_project(
        string memory project_name, 
        string memory project_desc, 
        string memory creator_name,
        uint goal_Amount,
        uint256 duration
    ) public{
        require(fundraisers[msg.sender].status == true );
        project_data.push(project_struct({
            creator: msg.sender,
            creator_name: creator_name,
            project_name: project_name,
            descrption: project_desc,
            current_Amount : 0,
            goal_Amount : goal_Amount,
            create_date: now,
            expired_date: now+duration,
            state: State.Fundraising
        }));
        fundraisers[msg.sender].project_data.push(project_struct({
            creator: msg.sender,
            creator_name: creator_name,
            project_name: project_name,
            descrption: project_desc,
            current_Amount : 0,
            goal_Amount : goal_Amount,
            create_date: now,
            expired_date: now+duration,
            state: State.Fundraising
        }));
    }
    
    function edit_project(
        uint index,
        string memory project_name, 
        string memory project_desc, 
        string memory creator_name,
        uint goal_Amount,
        uint256 duration
    ) public{
        require(fundraisers[msg.sender].status == true );
        require(project_data[index].creator == msg.sender );
        
        project_data[index].project_name = project_name;
        project_data[index].descrption = project_desc;
        project_data[index].creator_name = creator_name;
        project_data[index].goal_Amount = goal_Amount;
        project_data[index].expired_date = project_data[index].create_date + duration;
        
        check_project_status(index);
    }
    
    
    function donate( string memory name, uint project_ID, uint amount) public{
        require(payees[msg.sender].status == true );
        donation_data.push(donation_struct({
            don_address: msg.sender,
            name: name,
            project_ID: project_ID,
            amount: amount,
            don_date: now
        }));
        payees[msg.sender].payee_donation.push(donation_struct({
            don_address: msg.sender,
            name: name,
            project_ID: project_ID,
            amount: amount,
            don_date: now
        }));
        
        project_data[project_ID].current_Amount += amount;
        
        check_project_status(project_ID);
        
    }
    
    function check_project_status(uint index) private{
        // Update the status
        // check the goal amount 
        if (project_data[index].current_Amount >= project_data[index].goal_Amount)
            project_data[index].state = State.Successful;
        // check the expired_datedate
        if(now >= project_data[index].expired_date)
            project_data[index].state = State.Expired;
    }
    
    function withdraw(uint project_ID,string memory project_name, string memory to, string memory descrption, uint amount) public{
        require(fundraisers[msg.sender].status == true );
        withdraw_data.push(withdraw_struct({
            project_ID: project_ID,
            project_name: project_name,
            executor: msg.sender,
            to_organization: to,
            descrption: descrption,
            withdraw_amount: amount,
            withdraw_date : now
        }));
    }
    
    function get_project_data(uint index) public view returns(address,string memory,string memory,string memory,uint,uint,uint256,uint256,State){
        project_struct memory project = project_data[index];
        return (
        project.creator,
        project.creator_name,
        project.project_name,
        project.descrption,
        project.current_Amount,
        project.goal_Amount,
        project.create_date,
        project.expired_date,
        project.state
        );
    }
    
    
    function get_donate_data(uint index) public view returns(address,string memory,uint,uint,uint256){
        return (
        donation_data[index].don_address,
        donation_data[index].name,
        donation_data[index].project_ID,
        donation_data[index].amount,
        donation_data[index].don_date);
    }
    function get_personal_donation(uint index) public view returns(address,string memory,uint,uint,uint256){
        return (
        payees[msg.sender].payee_donation[index].don_address,
        payees[msg.sender].payee_donation[index].name,
        payees[msg.sender].payee_donation[index].project_ID,
        payees[msg.sender].payee_donation[index].amount,
        payees[msg.sender].payee_donation[index].don_date);
    }
    function get_donate_array()public view returns( donation_struct[] memory){
        return donation_data;
    }
    function get_personal_don_array()public view returns( donation_struct[] memory){
        return  payees[msg.sender].payee_donation;
    }

}