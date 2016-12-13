package venusweb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class App extends SpringBootServletInitializer {

	public static void main(String[] args) {

		
		System.setProperty("fetch-task-image-baseurl", "http://127.0.0.1");
		System.setProperty("fetch-task-enable", "true");
		System.setProperty("fetch-task-url", "${fetch-task-image-baseurl}/index.php?s=/home/data/core/id/{0}.html");
		System.setProperty("fetch-task-image-path", "D:/workspace/Venus");
		
		System.out.println("hello");
		
//		System.setProperty("server.servlet-path", "/venus-web");
		
		
		SpringApplication.run(App.class, args);
	}
	
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(App.class);
	}
}