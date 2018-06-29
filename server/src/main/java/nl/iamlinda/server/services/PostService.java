package nl.iamlinda.server.services;


import nl.iamlinda.server.models.Post;

import org.springframework.data.jpa.repository.Modifying;
//import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface PostService extends CrudRepository<Post, Integer> {
    List<Post> findByUserId(int id);
    
//    @Query("delete from Post u where userId = ?1")
//    List<Post>
    
    @Transactional
    @Modifying
    List<Post> deleteByUserId(int userId);
}
