package nl.iamlinda.server.services;


import nl.iamlinda.server.models.Post;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostService extends CrudRepository<Post, Integer> {
    List<Post> findAllByUserId(int id);
}
