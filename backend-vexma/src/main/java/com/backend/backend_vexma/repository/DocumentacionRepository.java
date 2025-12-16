package com.backend.backend_vexma.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.backend_vexma.model.Documentacion;

@Repository
public interface DocumentacionRepository extends JpaRepository<Documentacion, Long>{
    
}
