package com.example.watermanagementbackend.Repository;

import com.example.watermanagementbackend.Model.Municipality;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MunicipalityRepo extends JpaRepository<Municipality,Integer> {


}
