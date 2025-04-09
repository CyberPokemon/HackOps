package com.example.watermanagementbackend.Service;

import com.example.watermanagementbackend.Model.Municipality;
import com.example.watermanagementbackend.Model.MunicipalityData;
import com.example.watermanagementbackend.Repository.MunicipalityRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public ResponseEntity<String> register(Municipality municipality) {

        if(municipalityRepo.findByUsername(municipality.getUsername()) !=null)
        {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        municipality.setPassword(encoder.encode(municipality.getPassword()));

        municipalityRepo.save(municipality);

        return ResponseEntity.ok("User registered successfully");
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
