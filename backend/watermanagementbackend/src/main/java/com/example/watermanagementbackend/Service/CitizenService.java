package com.example.watermanagementbackend.Service;

import com.example.watermanagementbackend.Model.Citizen;
import com.example.watermanagementbackend.Model.Municipality;
import com.example.watermanagementbackend.Repository.CitizenRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class CitizenService {

    @Autowired
    private CitizenRepo citizenRepo;

    @Autowired
    JWTService jwtService;

    @Autowired
    AuthenticationManager authenticationManager;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public Citizen register(Citizen citizen) {
        if(citizenRepo.findByUsername(citizen.getUsername()) != null)
        {
            return citizen;
        }

        citizen.setPassword(encoder.encode(citizen.getPassword()));

        return  citizenRepo.save(citizen);

    }

    public String verify(Citizen citizen) {

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(citizen.getUsername(),citizen.getPassword()));

        if(authentication.isAuthenticated())
        {
            return jwtService.generateToken(citizen.getUsername());
        }
        return "FAIL";
    }

//    public String verify(Municipality municipality) {
//        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(municipality.getUsername(),municipality.getPassword()));
//
//        if(authentication.isAuthenticated())
//        {
//            return jwtService.generateToken(municipality.getUsername());
//        }
//        return "FAIL";
//
//    }

    public Citizen getCitizenByUsername(String username) {
        Citizen citizen = citizenRepo.findByUsername(username);
        if (citizen == null) {
            throw new UsernameNotFoundException("Citizen not found: " + username);
        }
        return citizen;
    }


}
