package com.example.watermanagementbackend.Service;

import com.example.watermanagementbackend.Model.Citizen;
import com.example.watermanagementbackend.Model.Municipality;
import com.example.watermanagementbackend.Repository.CitizenRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CitizenService {

    @Autowired
    private CitizenRepo citizenRepo;

    public Citizen register(Citizen citizen) {
        return citizenRepo.save(citizen);
    }
}
