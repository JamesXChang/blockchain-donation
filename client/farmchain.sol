pragma solidity ^0.5.8;

contract farmchain{

    struct Plant_data{
        //growing data
        uint index;
        string name;
        uint256 plant_date;
        uint plant_temperature;
        uint plant_water_volume;
        uint sun_hours;
        uint256 harvest_date;
    }
    struct Warehouse_data{
        //warehouse data
        uint index;
        string name;
        uint house_temperature;
        uint stock;
    }
    struct Tran_data{
        //cold chain logistic
        uint index;
        string name;
        uint256 shipment_date;
        uint tran_temperature;
    }
    struct Order_data{
        //order
        uint index;
        string name;
        bool is_ordered;
        uint256 order_date;
        //uint order_hash;
        uint256 shipment_date;
        uint256 arrival_date;
    }
    
    address public admin;
    address public farmer;
    Plant_data[] public Plant;
    Warehouse_data[] public Warehouse;
    Tran_data[] public Tran;
    Order_data[] public Order;

    constructor() public{
        admin = msg.sender;
    }

    function delegate(address to) public {
        require(msg.sender == admin, "Only admin can uplaod data");
        farmer = to;
    }

    // planting data
    function planted(string memory _name) public{
        //require(msg.sender == admin, "Only admin can uplaod data");
        require(msg.sender == farmer||msg.sender == admin, "Only farmer or admin can plant");
        uint index = Plant.length;
        Plant.push(Plant_data({
            index: index,
            name: _name,
            plant_date: now,
            plant_temperature: 0,
            plant_water_volume: 0,
            sun_hours: 0,
            harvest_date: 0
        }));
    }
    function upload_plant_data(uint index, uint plant_temperature, uint plant_water_volume, uint sun_hours) public
    {
        require(msg.sender == farmer||msg.sender == admin, "Only farmer or admin can uplaod data");
        Plant[index].plant_temperature = plant_temperature;
        Plant[index].plant_water_volume = plant_water_volume;
        Plant[index].sun_hours = sun_hours;
    }
    function harvest(uint index, uint amount)public {
        require(msg.sender == farmer||msg.sender == admin, "Only farmer or admin can harvest");
        Plant[index].harvest_date = now;

        if(index<Warehouse.length){
            Warehouse[index].stock += amount;
        }
        else{
            Warehouse.push(Warehouse_data({
                index: index,
                name: Plant[index].name,
                house_temperature: 0,
                stock: amount
            }));
        }
        Order.push(Order_data({
            index: index,
            name: Plant[index].name,
            is_ordered: false,
            order_date: 0,
            //order_hash: 0,
            shipment_date: 0,
            arrival_date: 0
        }));
    }
    function upload_warehouse_data(uint index, uint house_temperature) public {
        require(msg.sender == admin, "Only admin can upload_warehouse_data");
        Warehouse[index].house_temperature = house_temperature;
    }

    //Order
    function order(uint index)public{
        require(Order[index].is_ordered == false, "This product is already sold out!");
        require(Warehouse[index].stock>0, "This product is already sold out!");
        Order[index].is_ordered = true;
        Order[index].order_date = now;
        Warehouse[index].stock = 0;
    }
    function shipment(uint index) public
    {
        require(msg.sender == farmer||msg.sender == admin, "Only farmer or admin can shipment");
        Order[index].shipment_date = now;
        Tran.push(Tran_data({
            index: index,
            name: Plant[index].name,
            shipment_date: now,
            tran_temperature: 0
        }));
    }

    // transportation  data
    function upload_tran_data(uint index, uint tran_temperature) public {
        require(msg.sender == admin, "Only admin can uplaod data");
        Tran[index].tran_temperature = tran_temperature;
    }

    function arrival(uint index) public
    {
        Order[index].arrival_date = now;
    }
    function get_plant_data(uint index) public view returns(string memory,uint256,uint,uint,uint,uint256){
        return (
        Plant[index].name,
        Plant[index].plant_date,
        Plant[index].plant_temperature,
        Plant[index].plant_water_volume,
        Plant[index].sun_hours,
        Plant[index].harvest_date);
    }
    function get_Warehouse_data(uint index) public view returns(string memory,uint,uint){
        return (
        Warehouse[index].name,
        Warehouse[index].house_temperature,
        Warehouse[index].stock);
    }
    function get_Tran_data(uint index) public view returns(string memory,uint256,uint){
        return (
        Tran[index].name,
        Tran[index].shipment_date,
        Tran[index].tran_temperature);
    }
    function get_Order_data(uint index) public view returns(string memory,bool,uint256,uint256,uint256){
        return (
        Order[index].name,
        Order[index].is_ordered,
        Order[index].order_date,
        Order[index].shipment_date,
        Order[index].arrival_date);
    }
}