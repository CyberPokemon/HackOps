package com.example.watermanagementbackend.Service;

import com.example.watermanagementbackend.Model.Citizen;
import com.example.watermanagementbackend.Repository.CitizenRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class MyUserDetailsService implements UserDetailsService {


    @Autowired
    private CitizenRepo citizenRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Citizen citizen = citizenRepo.findByUsername(username);

        if (citizen == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return new User(citizen.getUsername(), citizen.getPassword(), Collections.emptyList());
    }
}
