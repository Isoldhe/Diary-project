package nl.iamlinda.server.services;


        import nl.iamlinda.server.models.Post;
        import org.springframework.data.repository.CrudRepository;
        import org.springframework.stereotype.Repository;

@Repository
public interface PostService extends CrudRepository<Post, Integer> {

}
