//main.js
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';

ContractAddress = "0x2C5847D0bABC3c60B733644Ce8b0265810cd90d0"
myContract = web3.eth.contract([{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"project_data","outputs":[{"name":"creator","type":"address"},{"name":"creator_name","type":"string"},{"name":"project_name","type":"string"},{"name":"descrption","type":"string"},{"name":"current_Amount","type":"uint256"},{"name":"goal_Amount","type":"uint256"},{"name":"create_date","type":"uint256"},{"name":"expired_date","type":"uint256"},{"name":"state","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"f_address","type":"address"}],"name":"delegate_fundraiser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"project_name","type":"string"},{"name":"project_desc","type":"string"},{"name":"creator_name","type":"string"},{"name":"goal_Amount","type":"uint256"},{"name":"duration","type":"uint256"}],"name":"create_project","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"payeesIndexSize","outputs":[{"name":"","type":"int8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"int8"}],"name":"fundraiser_index","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"donation_data","outputs":[{"name":"don_address","type":"address"},{"name":"name","type":"string"},{"name":"project_ID","type":"uint256"},{"name":"amount","type":"uint256"},{"name":"don_date","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"int8"}],"name":"payeesIndex","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"payees","outputs":[{"name":"status","type":"bool"},{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"get_donate_array","outputs":[{"components":[{"name":"don_address","type":"address"},{"name":"name","type":"string"},{"name":"project_ID","type":"uint256"},{"name":"amount","type":"uint256"},{"name":"don_date","type":"uint256"}],"name":"","type":"tuple[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"get_withdraw_data","outputs":[{"name":"","type":"uint256"},{"name":"","type":"string"},{"name":"","type":"address"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"get_donate_data","outputs":[{"name":"","type":"address"},{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"index","type":"uint256"},{"name":"project_name","type":"string"},{"name":"project_desc","type":"string"},{"name":"creator_name","type":"string"},{"name":"goal_Amount","type":"uint256"},{"name":"duration","type":"uint256"}],"name":"edit_project","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"fundraisers","outputs":[{"name":"status","type":"bool"},{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"get_project_array","outputs":[{"components":[{"name":"creator","type":"address"},{"name":"creator_name","type":"string"},{"name":"project_name","type":"string"},{"name":"descrption","type":"string"},{"name":"current_Amount","type":"uint256"},{"name":"goal_Amount","type":"uint256"},{"name":"create_date","type":"uint256"},{"name":"expired_date","type":"uint256"},{"name":"state","type":"uint8"}],"name":"","type":"tuple[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"name","type":"string"},{"name":"project_ID","type":"uint256"},{"name":"amount","type":"uint256"}],"name":"donate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get_fundraiser_pro_array","outputs":[{"components":[{"name":"creator","type":"address"},{"name":"creator_name","type":"string"},{"name":"project_name","type":"string"},{"name":"descrption","type":"string"},{"name":"current_Amount","type":"uint256"},{"name":"goal_Amount","type":"uint256"},{"name":"create_date","type":"uint256"},{"name":"expired_date","type":"uint256"},{"name":"state","type":"uint8"}],"name":"","type":"tuple[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"get_withdraw_array","outputs":[{"components":[{"name":"project_ID","type":"uint256"},{"name":"project_name","type":"string"},{"name":"executor","type":"address"},{"name":"to_organization","type":"string"},{"name":"descrption","type":"string"},{"name":"withdraw_amount","type":"uint256"},{"name":"withdraw_date","type":"uint256"}],"name":"","type":"tuple[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"get_project_data","outputs":[{"name":"","type":"address"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"fundraisersIndexSize","outputs":[{"name":"","type":"int8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"p_address","type":"address"}],"name":"delegate_payee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"withdraw_data","outputs":[{"name":"project_ID","type":"uint256"},{"name":"project_name","type":"string"},{"name":"executor","type":"address"},{"name":"to_organization","type":"string"},{"name":"descrption","type":"string"},{"name":"withdraw_amount","type":"uint256"},{"name":"withdraw_date","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"project_ID","type":"uint256"},{"name":"project_name","type":"string"},{"name":"to","type":"string"},{"name":"descrption","type":"string"},{"name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get_personal_don_array","outputs":[{"components":[{"name":"don_address","type":"address"},{"name":"name","type":"string"},{"name":"project_ID","type":"uint256"},{"name":"amount","type":"uint256"},{"name":"don_date","type":"uint256"}],"name":"","type":"tuple[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"get_personal_donation","outputs":[{"name":"","type":"address"},{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]);
Contract = myContract.at(ContractAddress); 


//project
// Template.demo1.created = function() {
//   this.showPlantData = false;
// };
// Template.demo1.onCreated(function helloOnCreated() {
//   this.index = new ReactiveVar(0);
//   this.name = new ReactiveVar(0);
//   this.plant_date = new ReactiveVar(0);
//   this.plant_temperature = new ReactiveVar(0);
//   this.plant_water_volume = new ReactiveVar(0);
//   this.sun_hours = new ReactiveVar(0);
//   this.harvest_date = new ReactiveVar(0);
// });

Template.demo1.onCreated(function helloOnCreated() {

});
Template.demo1.events({
  'click #create'(event, instance) {
    var x = document.getElementById("create_project");
    Contract.create_project(x.elements[0].value,x.elements[1].value,x.elements[2].value,x.elements[3].value,x.elements[4].value,function(error,result){});
  },

  'click #edit'(event, instance) {
    var x = document.getElementById("edit_project");
    Contract.edit_project(x.elements[0].value,x.elements[1].value,x.elements[2].value,x.elements[3].value,x.elements[4].value,x.elements[5].value, function(error,result){});
  },
});	

// Donation
Template.demo2.events({
  'click #donate'(event, instance) {
    var x = document.getElementById("donate_project");
    Contract.donate(x.elements[0].value,x.elements[1].value,x.elements[2].value, function(error,result){});
  },
});	

// Withdraw
Template.demo3.events({
  'click #withdraw'(event, instance) {
    var x = document.getElementById("withdraw_money");
    Contract.withdraw(x.elements[0].value,x.elements[1].value,x.elements[2].value,x.elements[3].value,x.elements[4].value,  function(error,result){});
  },
});	

// Data Tracking
Template.demo4.created = function() {
  this.showProjectData = false;
  this.showDonationData = false;
  this.showWithdrawData = false;
};
Template.demo4.onCreated(function helloOnCreated() {
  this.p_index = new ReactiveVar(0);
  this.p_creator = new ReactiveVar(0);
  this.p_creator_name = new ReactiveVar(0);
  this.p_project_name = new ReactiveVar(0);
  this.p_description = new ReactiveVar(0);
  this.p_current_Amount = new ReactiveVar(0);
  this.p_goal_Amount = new ReactiveVar(0);
  this.p_create_date = new ReactiveVar(0);
  this.p_expired_date = new ReactiveVar(0);
  this.p_state = new ReactiveVar(0);
  this.d_index = new ReactiveVar(0);
  this.don_address = new ReactiveVar(0);
  this.d_name = new ReactiveVar(0);
  this.d_project_ID = new ReactiveVar(0);
  this.d_amount = new ReactiveVar(0);
  this.don_date = new ReactiveVar(0);
  this.w_index = new ReactiveVar(0);
  this.w_project_ID = new ReactiveVar(0);
  this.w_project_name = new ReactiveVar(0);
  this.w_executor = new ReactiveVar(0);
  this.w_to_organization = new ReactiveVar(0);
  this.w_description = new ReactiveVar(0);
  this.withdraw_amount = new ReactiveVar(0);
  this.withdraw_date = new ReactiveVar(0);
});
Template.demo4.events({
  'click #getprojectdata'(event, template) {
    var x = document.getElementById("get_project_data");
    //console.log(x.elements[0].value);
    Contract.get_project_data(x.elements[0].value, async function(error,result){
      console.log(await result[0]);
      template.p_index.set(x.elements[0].value);
      template.p_creator.set(result[0]);
      template.p_creator_name.set(result[1]);
      template.p_project_name.set(result[2]);
      template.p_description.set(result[3]);
      template.p_current_Amount.set(result[4]);
      template.p_goal_Amount.set(result[5]);
      template.p_create_date.set(result[6]);
      template.p_expired_date.set(result[7]);
      template.p_state.set(result[8]);
    });
    //console.log(template.name);
    template.showProjectData = true;
  },
  
  'click #getdonationdata'(event, template) {
    var x = document.getElementById("get_donation_data");
    //console.log(x.elements[0].value);
    Contract.get_donate_data(x.elements[0].value, async function(error,result){
      console.log(await result[0]);
      template.d_index.set(x.elements[0].value);
      template.don_address.set(result[0]);
      template.d_name.set(result[1]);
      template.d_project_ID.set(result[2]);
      template.d_amount.set(result[3]);
      template.don_date.set(result[4]);
    });
    //console.log(template.name);
    template.showDonationData = true;
  },
  'click #getwithdrawdata'(event, template) {
    var x = document.getElementById("get_withdraw_data");
    //console.log(x.elements[0].value);
    Contract.get_withdraw_data(x.elements[0].value, async function(error,result){
      console.log(await result[0]);
      template.w_index.set(x.elements[0].value);
      template.w_project_ID.set(result[0]);
      template.w_project_name.set(result[1]);
      template.w_executor.set(result[2]);
      template.w_to_organization.set(result[3]);
      template.w_description.set(result[4]);
      template.withdraw_amount.set(result[5]);
      template.withdraw_date.set(result[6]);
    });
    //console.log(template.name);
    template.showWithdrawData = true;
  },
});	
Template.demo4.helpers({
  p_index() {
    if(Template.instance().showProjectData)
      return Template.instance().p_index.get('p_index');
  },
  p_creator() {
    if(Template.instance().showProjectData)
      return Template.instance().p_creator.get();
  },
  p_creator_name() {
    if(Template.instance().showProjectData)
      return Template.instance().p_creator_name.get();
  },
  p_project_name() {
    if(Template.instance().showProjectData)
      return Template.instance().p_project_name.get();
  },
  p_description() {
    if(Template.instance().showProjectData)
      return Template.instance().p_description.get();
  },
  p_current_Amount: function(){
    if(Template.instance().showProjectData)
      return Template.instance().p_current_Amount.get();
  },
  p_goal_Amount() {
    if(Template.instance().showProjectData)
      return Template.instance().p_goal_Amount.get();
  },
  p_create_date: function(){
    if(Template.instance().showProjectData)
      return Template.instance().p_create_date.get();
  },
  p_expired_date() {
    if(Template.instance().showProjectData)
      return Template.instance().p_expired_date.get();
  },
  p_state: function(){
    if(Template.instance().showProjectData)
      return Template.instance().p_state.get();
  },
  showProjectData: function(){
    return Template.instance().p_index.get('p_index');
  },
  // donation
  d_index() {
    if(Template.instance().showDonationData)
      return Template.instance().d_index.get('d_index');
  },
  don_address: function(){
    if(Template.instance().showDonationData)
      return Template.instance().don_address.get();
  },
  d_name() {
    if(Template.instance().showDonationData)
      return Template.instance().d_name.get();
  },
  d_project_ID: function(){
    if(Template.instance().showDonationData)
      return Template.instance().d_project_ID.get();
  },
  d_amount() {
    if(Template.instance().showDonationData)
      return Template.instance().d_amount.get();
  },
  don_date: function(){
    if(Template.instance().showDonationData)
      return Template.instance().don_date.get();
  },
  showDonationData: function(){
    return Template.instance().d_index.get('d_index');
  },
  // withdraw
  w_index() {
    if(Template.instance().showWithdrawData)
      return Template.instance().w_index.get('w_index');
  },
  w_project_ID: function(){
    if(Template.instance().showWithdrawData)
      return Template.instance().w_project_ID.get();
  },
  w_project_name() {
    if(Template.instance().showWithdrawData)
      return Template.instance().w_project_name.get();
  },
  w_executor: function(){
    if(Template.instance().showWithdrawData)
      return Template.instance().w_executor.get();
  },
  w_to_organization() {
    if(Template.instance().showWithdrawData)
      return Template.instance().w_to_organization.get();
  },
  w_description: function(){
    if(Template.instance().showWithdrawData)
      return Template.instance().w_description.get();
  },
  withdraw_amount: function(){
    if(Template.instance().showWithdrawData)
      return Template.instance().withdraw_amount.get();
  },
  withdraw_date: function(){
    if(Template.instance().showWithdrawData)
      return Template.instance().withdraw_date.get();
  },
  showWithdrawData: function(){
    return Template.instance().w_index.get('w_index');
  },
});	

Template.demo5.events({
  'click #delegate_payee'(event, instance) {
    var x = document.getElementById("delegate_payee_address");
    Contract.delegate_payee(x.elements[0].value, function(error,result){});
  },
  'click #delegate_fundraiser'(event, instance) {
    var x = document.getElementById("delegate_fundraiser_address");
    Contract.delegate_fundraiser(x.elements[0].value, function(error,result){});
  },
});	