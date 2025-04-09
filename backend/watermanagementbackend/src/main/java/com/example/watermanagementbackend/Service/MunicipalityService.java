package com.example.watermanagementbackend.Service;

import com.example.watermanagementbackend.Model.Municipality;
import com.example.watermanagementbackend.Model.MunicipalityData;
import com.example.watermanagementbackend.Repository.MunicipalityRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MunicipalityService {

    @Autowired
    private MunicipalityRepo municipalityRepo;

    @Autowired
    JWTService jwtService;

    @Autowired
    AuthenticationManager authenticationManager;

    public Municipality register(Municipality municipality) {

        return municipalityRepo.save(municipality);
    }

    public List<MunicipalityData> getListOfAllMunicipalities() {
        return municipalityRepo.findAll()
                .stream()
                .map(m -> new MunicipalityData(m.getMunicipalityName(), m.getWards()))
                .toList();
    }

    public String verify(Municipality municipality) {

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(municipality.getUsername(),municipality.getPassword()));

        if(authentication.isAuthenticated())
        {
            return jwtService.generateToken(municipality.getUsername());
        }
        return "FAIL";
    }
}
