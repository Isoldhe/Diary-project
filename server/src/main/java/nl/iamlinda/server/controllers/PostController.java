package nl.iamlinda.server.controllers;

import nl.iamlinda.server.services.PostService;
import nl.iamlinda.server.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@Controller
public class PostController {

    @Autowired private PostService postService;

    @ResponseBody
    @RequestMapping(value = "/post", method = RequestMethod.POST)
    public int create(@RequestBody Post post) {
        return postService.save(post).getId();
    }
}

