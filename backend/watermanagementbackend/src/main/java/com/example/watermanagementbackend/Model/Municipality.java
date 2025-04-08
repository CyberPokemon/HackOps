package com.example.watermanagementbackend.Model;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Municipality {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String municipalityName;
    private String authorizedPersonName;
    private String password;
    private String area;

    @ElementCollection
    private List<Integer> wards;

    public Municipality(long id, String municipalityName, String authorizedPersonName, String password, String area, List<Integer> wards) {
        this.id = id;
        this.municipalityName = municipalityName;
        this.authorizedPersonName = authorizedPersonName;
        this.password = password;
        this.area = area;
        this.wards = wards;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getMunicipalityName() {
        return municipalityName;
    }

    public void setMunicipalityName(String municipalityName) {
        this.municipalityName = municipalityName;
    }

    public String getAuthorizedPersonName() {
        return authorizedPersonName;
    }

    public void setAuthorizedPersonName(String authorizedPersonName) {
        this.authorizedPersonName = authorizedPersonName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public List<Integer> getWards() {
        return wards;
    }

    public void setWards(List<Integer> wards) {
        this.wards = wards;
    }
}
