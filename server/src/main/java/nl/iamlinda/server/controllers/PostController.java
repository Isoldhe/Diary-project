package nl.iamlinda.server.controllers;

import nl.iamlinda.server.services.PostService;
import nl.iamlinda.server.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@Controller
public class PostController {

    @Autowired private PostService postService;

    @ResponseBody
    @RequestMapping(value = "/post", method = RequestMethod.POST)
    public int create(@RequestBody Post post) {
        return postService.save(post).getId();
    }

    @ResponseBody
    @RequestMapping(value = "/post", method = RequestMethod.GET)
    public List<Post> findAll() {
        System.out.println("in the findAll() method of PostController!!!");
        return (List<Post>)postService.findAll();
    }

    @ResponseBody
    @RequestMapping(value = "/post/{id}", method = RequestMethod.PUT)
    public int updatePost(@PathVariable  int id, @RequestBody Post post) {
 //       if( postService.findById(id).isPresent() ) {
            Post postOld = postService.findById(id).get();
            postOld.setTitle(post.getTitle());
            postOld.setSmiley(post.getSmiley());
            postOld.setDate(post.getDate());
            postOld.setEntry(post.getEntry());
            System.out.println(postOld.getEntry());
            return postService.save(postOld).getId();
//        } else {
//            System.out.println("hoi");
//            return 0;
//        }

    }

    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/post/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable  int id) {
        postService.deleteById(id);
    }

    @ResponseBody
    @RequestMapping(value = "/post/{id}", method = RequestMethod.GET)
    public void get(@PathVariable  int id) {
        postService.findById(id);
    }
}

