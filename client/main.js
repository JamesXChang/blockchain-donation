//main.js
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';

ContractAddress = "0xba3cb6faa1bb1ab6b8f9a3c83c75b78156f9a5e9"
myContract = web3.eth.contract([{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"get_Tran_data","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"Warehouse","outputs":[{"name":"index","type":"uint256"},{"name":"name","type":"string"},{"name":"house_temperature","type":"uint256"},{"name":"stock","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"index","type":"uint256"}],"name":"order","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"get_Order_data","outputs":[{"name":"","type":"string"},{"name":"","type":"bool"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"string"}],"name":"planted","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"index","type":"uint256"},{"name":"tran_temperature","type":"uint256"}],"name":"upload_tran_data","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"}],"name":"delegate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"get_Warehouse_data","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"index","type":"uint256"}],"name":"shipment","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"Order","outputs":[{"name":"index","type":"uint256"},{"name":"name","type":"string"},{"name":"is_ordered","type":"bool"},{"name":"order_date","type":"uint256"},{"name":"shipment_date","type":"uint256"},{"name":"arrival_date","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"index","type":"uint256"}],"name":"arrival","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"index","type":"uint256"},{"name":"house_temperature","type":"uint256"}],"name":"upload_warehouse_data","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"Plant","outputs":[{"name":"index","type":"uint256"},{"name":"name","type":"string"},{"name":"plant_date","type":"uint256"},{"name":"plant_temperature","type":"uint256"},{"name":"plant_water_volume","type":"uint256"},{"name":"sun_hours","type":"uint256"},{"name":"harvest_date","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"get_plant_data","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"farmer","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"Tran","outputs":[{"name":"index","type":"uint256"},{"name":"name","type":"string"},{"name":"shipment_date","type":"uint256"},{"name":"tran_temperature","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"index","type":"uint256"},{"name":"amount","type":"uint256"}],"name":"harvest","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"index","type":"uint256"},{"name":"plant_temperature","type":"uint256"},{"name":"plant_water_volume","type":"uint256"},{"name":"sun_hours","type":"uint256"}],"name":"upload_plant_data","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"admin","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]);
Contract = myContract.at(ContractAddress); 


//plant
Template.demo1.created = function() {
  this.showPlantData = false;
};
Template.demo1.onCreated(function helloOnCreated() {
  this.index = new ReactiveVar(0);
  this.name = new ReactiveVar(0);
  this.plant_date = new ReactiveVar(0);
  this.plant_temperature = new ReactiveVar(0);
  this.plant_water_volume = new ReactiveVar(0);
  this.sun_hours = new ReactiveVar(0);
  this.harvest_date = new ReactiveVar(0);
});
Template.demo1.events({
  'click #start'(event, instance) {
    var x = document.getElementById("start_planting");
    Contract.planted(x.elements[0].value,function(error,result){});
  },

  'click #upload_plant'(event, instance) {
    var x = document.getElementById("upload_plant_data");
    Contract.upload_plant_data(x.elements[0].value,x.elements[1].value,x.elements[2].value,x.elements[3].value, function(error,result){});
  },

  'click #harvest_plant'(event, instance) {
    var x = document.getElementById("harvest");
    Contract.harvest(x.elements[0].value,x.elements[1].value, function(error,result){});
  },
  'click #getplant'(event, template) {
    var x = document.getElementById("get_plant_data");
    //console.log(x.elements[0].value);
    Contract.get_plant_data(x.elements[0].value, async function(error,result){
      console.log(await result[0]);
      template.name.set(result[0]);
      template.plant_date.set(result[1]);
      template.plant_temperature.set(result[2]);
      template.plant_water_volume.set(result[3]);
      template.sun_hours.set(result[4]);
      template.harvest_date.set(result[5]);

      //console.log(template.name);
    });
    //console.log(template.name);
    template.showPlantData = true;
  },
});	
Template.demo1.helpers({
  name: function(){
    //console.log(Template.instance().name);
    if(Template.instance().showPlantData)
      return Template.instance().name.get('name');
  },
  plant_date() {
    if(Template.instance().showPlantData)
      return Template.instance().plant_date.get();
  },
  plant_temperature() {
    if(Template.instance().showPlantData)
      return Template.instance().plant_temperature.get();
  },
  plant_water_volume() {
    if(Template.instance().showPlantData)
      return Template.instance().plant_water_volume.get();
  },
  sun_hours() {
    if(Template.instance().showPlantData)
      return Template.instance().sun_hours.get();
  },
  harvest_date() {
    if(Template.instance().showPlantData)
      return Template.instance().harvest_date.get();
  },
  showPlantData: function(){
    return Template.instance().name.get('name');
  },
});

//Warehouse
Template.demo2.created = function() {
  this.showWarehouseData = false;
};
Template.demo2.onCreated(function helloOnCreated() {
  this.name = new ReactiveVar(0);
  this.house_temperature = new ReactiveVar(0);
  this.stock = new ReactiveVar(0);
});

Template.demo2.events({
  'click #upload_warehouse'(event, instance) {
    var x = document.getElementById("warehouse");
    Contract.upload_warehouse_data(x.elements[0].value,x.elements[1].value, function(error,result){});
  },
  'click #getwarehouse'(event, template) {
    var x = document.getElementById("get_warehouse_data");
    //console.log(x.elements[0].value);
    Contract.get_Warehouse_data(x.elements[0].value, async function(error,result){
      console.log(await result[0]);
      template.name.set(result[0]);
      template.house_temperature.set(result[1]);
      template.stock.set(result[2]);
    });
    //console.log(template.name);
    template.showWarehouseData = true;
  },
});	

Template.demo2.helpers({
  name() {
    if(Template.instance().showWarehouseData)
      return Template.instance().name.get();
  },
  house_temperature() {
    if(Template.instance().showWarehouseData)
      return Template.instance().house_temperature.get();
  },
  stock() {
    if(Template.instance().showWarehouseData)
      return Template.instance().stock.get();
  },
  showWarehouseData: function(){
    return Template.instance().name.get('name');
  },
});

//Cold Chain Logistic
Template.demo3.created = function() {
  this.showTranData = false;
};
Template.demo3.onCreated(function helloOnCreated() {
  this.name = new ReactiveVar(0);
  this.shipment_date = new ReactiveVar(0);
  this.tran_temperature = new ReactiveVar(0);
});
Template.demo3.events({
  'click #upload_tran'(event, instance) {
    var x = document.getElementById("transportation");
    Contract.upload_tran_data(x.elements[0].value,x.elements[1].value, function(error,result){});
  },
  'click #Shipment'(event, instance) {
    var x = document.getElementById("shipment_index");
    Contract.shipment(x.elements[0].value, function(error,result){});
  },
  'click #gettrandata'(event, template) {
    var x = document.getElementById("get_tran_data");
    //console.log(x.elements[0].value);
    Contract.get_Tran_data(x.elements[0].value, async function(error,result){
      console.log(await result[0]);
      template.name.set(result[0]);
      template.shipment_date.set(result[1]);
      template.tran_temperature.set(result[2]);
    });
    //console.log(template.name);
    template.showTranData = true;
  },
});	
Template.demo3.helpers({
  name() {
    if(Template.instance().showTranData)
      return Template.instance().name.get();
  },
  shipment_date() {
    if(Template.instance().showTranData)
      return Template.instance().shipment_date.get();
  },
  tran_temperature() {
    if(Template.instance().showTranData)
      return Template.instance().tran_temperature.get();
  },
  showTranData: function(){
    return Template.instance().name.get('name');
  },
});

//Order
Template.demo4.created = function() {
  this.showOrderData = false;
};
Template.demo4.onCreated(function helloOnCreated() {
  this.name = new ReactiveVar(0);
  this.is_ordered = new ReactiveVar(0);
  this.order_date = new ReactiveVar(0);
  this.shipment_date = new ReactiveVar(0);
  this.arrival_date = new ReactiveVar(0);
});
Template.demo4.events({
  'click #order'(event, instance) {
    var x = document.getElementById("order_index");
    Contract.order(x.elements[0].value, function(error,result){});
  },
  'click #arrival'(event, instance) {
    var x = document.getElementById("arrival_index");
    Contract.arrival(x.elements[0].value, function(error,result){});
  },
  'click #getorderdata'(event, template) {
    var x = document.getElementById("get_order_data");
    //console.log(x.elements[0].value);
    Contract.get_Order_data(x.elements[0].value, async function(error,result){
      console.log(await result[0]);
      template.name.set(result[0]);
      template.is_ordered.set(result[1]);
      template.order_date.set(result[2]);
      template.shipment_date.set(result[3]);
      template.arrival_date.set(result[4]);
    });
    //console.log(template.name);
    template.showOrderData = true;
  },
});	
Template.demo4.helpers({
  name() {
    if(Template.instance().showOrderData)
      return Template.instance().name.get();
  },
  is_ordered() {
    if(Template.instance().showOrderData)
      return Template.instance().is_ordered.get();
  },
  order_date() {
    if(Template.instance().showOrderData)
      return Template.instance().order_date.get();
  },
  shipment_date() {
    if(Template.instance().showOrderData)
      return Template.instance().shipment_date.get();
  },
  arrival_date() {
    if(Template.instance().showOrderData)
      return Template.instance().arrival_date.get();
  },
  showOrderData: function(){
    return Template.instance().name.get('name');
  },
});	

Template.demo5.events({
  'click #delegate'(event, instance) {
    var x = document.getElementById("delegate_address");
    Contract.delegate(x.elements[0].value, function(error,result){});
  },
});	