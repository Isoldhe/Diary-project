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

    //    Implementation of UserService findByEmail method
//    @ResponseBody
//    @RequestMapping(value = "/post/{id}", method = RequestMethod.GET)
//    public List<Post> findById(@PathVariable int id) {
//        return postService.findById(id);
//    }

    @ResponseBody
    @GetMapping("/post/{id}")
    public Post get(@PathVariable("id") int id) {
        System.out.println("PostService findById executed: " + postService.findById(id));

        if( postService.findById(id).isPresent() ) {
            return postService.findById(id).get();
        }
        else {
            return new Post();
        }
    }

//    @Override
//    public Article getArticleById(long articleId) {
//        Article obj = articleRepository.findById(articleId).get();
//        return obj;
//    }

    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/post/{id}", method = RequestMethod.DELETE)
    public void update(@PathVariable  int id) {
        postService.deleteById(id);
    }

//    @ResponseBody
//    @RequestMapping(value = "/post/{id}", method = RequestMethod.GET)
//    public void get(@PathVariable  int id) {
//        postService.findById(id);
//    }
}

