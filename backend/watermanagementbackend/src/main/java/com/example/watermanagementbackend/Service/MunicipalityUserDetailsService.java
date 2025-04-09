package com.example.watermanagementbackend.Service;

import com.example.watermanagementbackend.Model.Municipality;
import com.example.watermanagementbackend.Repository.MunicipalityRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
//@Primary
public class MunicipalityUserDetailsService implements UserDetailsService{

    @Autowired
    private MunicipalityRepo municipalityRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Municipality municipality = municipalityRepo.findByUsername(username);
        if (municipality == null) {
            throw new UsernameNotFoundException("Municipality not found: " + username);
        }

        return new User(
                municipality.getUsername(),
                municipality.getPassword(),
                Collections.emptyList()
        );
    }
}
