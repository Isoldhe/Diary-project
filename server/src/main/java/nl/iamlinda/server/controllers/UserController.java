package nl.iamlinda.server.controllers;

import nl.iamlinda.server.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:4200")
@Controller
public class UserController {

    @Autowired
    private UserService userService;
}
