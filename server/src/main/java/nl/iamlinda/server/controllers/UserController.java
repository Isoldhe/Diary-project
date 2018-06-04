package nl.iamlinda.server.controllers;

import nl.iamlinda.server.models.User;
import nl.iamlinda.server.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@Controller
public class UserController {

    // (required = false) prevents exception from being thrown which causes spring to not launch
    @Autowired(required = false)
    private UserService userService;

    //curl -H "Content-Type: application/json" -X POST -d '{"id": 0, "task": "taskTest"}' http://localhost:8080/todo
    @ResponseBody
    @RequestMapping(value = "/user", method = RequestMethod.POST)
    public int create(@RequestBody User user) {
        return userService.save(user).getId();
    }

    //curl  http://localhost:8080/todo
    @ResponseBody
    @RequestMapping(value = "/user", method = RequestMethod.GET)
    public List<User> findAll() {
        return (List<User>)userService.findAll();
    }

    @RequestMapping(value = "/page", method = RequestMethod.GET)
    public String page() {
        return "user";
    }
}
