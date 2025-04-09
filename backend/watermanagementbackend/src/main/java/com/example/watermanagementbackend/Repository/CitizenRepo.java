package com.example.watermanagementbackend.Repository;


import com.example.watermanagementbackend.Model.Citizen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CitizenRepo extends JpaRepository<Citizen,Integer> {

    Citizen findByUsername(String username);
}
