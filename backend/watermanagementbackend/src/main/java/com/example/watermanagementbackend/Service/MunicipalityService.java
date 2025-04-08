package com.example.watermanagementbackend.Service;

import com.example.watermanagementbackend.Model.Municipality;
import com.example.watermanagementbackend.Repository.MunicipalityRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MunicipalityService {

    @Autowired
    private MunicipalityRepo municipalityRepo;

    public Municipality register(Municipality municipality) {

        return municipalityRepo.save(municipality);
    }
}
