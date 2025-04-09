package com.example.watermanagementbackend.Model;

import java.util.List;

public class MunicipalityData {

    private String municipalityName;
    private List<Integer> wards;

    public MunicipalityData(String municipalityName, List<Integer> wards) {
        this.municipalityName = municipalityName;
        this.wards = wards;
    }

    public String getMunicipalityName() {
        return municipalityName;
    }

    public void setMunicipalityName(String municipalityName) {
        this.municipalityName = municipalityName;
    }

    public List<Integer> getWards() {
        return wards;
    }

    public void setWards(List<Integer> wards) {
        this.wards = wards;
    }
}
