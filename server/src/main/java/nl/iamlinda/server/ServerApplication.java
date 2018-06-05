package nl.iamlinda.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

// Possibles fixes
// (basePackages="nl.iamlinda.server", entityManagerFactoryRef="UserService")
//@EntityScan("nl.iamlinda.*")
@SpringBootApplication(scanBasePackages={"nl.iamlinda.server"})
//@EnableJpaRepositories(basePackages = "nl.iamlinda.server")
public class ServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}
}
