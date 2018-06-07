package nl.iamlinda.server.controllers;

import nl.iamlinda.server.services.PostService;
import nl.iamlinda.server.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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
    @GetMapping("/post/{id}")
    public Post get(@PathVariable("id") int id) {
//        Checks if Post with this id is present and then returns that Post
        if( postService.findById(id).isPresent() ) {
            return postService.findById(id).get();
        }
        else {
//            If the Post is not present, returns a new empty Post
            return new Post();
        }
    }

    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/post/{id}", method = RequestMethod.DELETE)
    public void update(@PathVariable  int id) {
        postService.deleteById(id);
    }
}

