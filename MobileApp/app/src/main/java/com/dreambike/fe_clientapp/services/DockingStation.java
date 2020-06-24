package com.dreambike.fe_clientapp.services;

public class DockingStation {
  private String name;
  private Double lng;
  private Double lat;
  private int capacity;
  private int bikes;
  private Boolean active;

  public DockingStation(String name, Double lng, Double lat, int capacity, int bikes, Boolean active){
    this.name = name;
    this.lng = lng;
    this.lat = lat;
    this.capacity = capacity;
    this.bikes = bikes;
    this.active = active;
  }
  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Double getLng() {
    return lng;
  }

  public void setLng(Double lng) {
    this.lng = lng;
  }

  public Double getLat() {
    return lat;
  }

  public void setLat(Double lat) {
    this.lat = lat;
  }

  public int getCapacity() {
    return capacity;
  }

  public void setCapacity(int capacity) {
    this.capacity = capacity;
  }

  public int getBikes() {
    return bikes;
  }

  public void setBikes(int bikes) {
    this.bikes = bikes;
  }

  public Boolean getActive() {
    return active;
  }

  public void setActive(Boolean active) {
    this.active = active;
  }


}
