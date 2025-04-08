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
    @CollectionTable(name = "municipality_wards", joinColumns = @JoinColumn(name = "municipality_id"))
    @Column(name = "ward_number")
    private List<Integer> wards;

    @Override
    public String toString() {
        return "Municipality{" +
                "id=" + id +
                ", municipalityName='" + municipalityName + '\'' +
                ", authorizedPersonName='" + authorizedPersonName + '\'' +
                ", password='" + password + '\'' +
                ", area='" + area + '\'' +
                ", wards=" + wards +
                '}';
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
