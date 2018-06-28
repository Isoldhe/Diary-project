package nl.iamlinda.server.services;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import nl.iamlinda.server.models.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Repository
public interface UserService extends CrudRepository<User, Integer> {

}
