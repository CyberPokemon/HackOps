package com.example.watermanagementbackend.Service;

import com.example.watermanagementbackend.Model.Municipality;
import com.example.watermanagementbackend.Model.MunicipalityData;
import com.example.watermanagementbackend.Repository.MunicipalityRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MunicipalityService {

    @Autowired
    private MunicipalityRepo municipalityRepo;

    public Municipality register(Municipality municipality) {

        return municipalityRepo.save(municipality);
    }

    public List<MunicipalityData> getListOfAllMunicipalities() {
        return municipalityRepo.findAll()
                .stream()
                .map(m -> new MunicipalityData(m.getMunicipalityName(), m.getWards()))
                .toList();
    }
}
