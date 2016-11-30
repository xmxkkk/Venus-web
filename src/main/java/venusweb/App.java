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
//		fetch-task-image-baseurl=http://127.0.0.1
//		fetch-task-enable=true
//		fetch-task-url=${fetch-task-image-baseurl}/index.php?s=/home/data/core/id/{0}.html
//		fetch-task-image-path=D:/workspace/Venus
//		upload-image-path-dir=C:/Users/Administrator/Desktop/lu_stock_admin/
		
		System.setProperty("fetch-task-image-baseurl", "http://127.0.0.1");
		System.setProperty("fetch-task-enable", "true");
		System.setProperty("fetch-task-url", "${fetch-task-image-baseurl}/index.php?s=/home/data/core/id/{0}.html");
		System.setProperty("fetch-task-image-path", "D:/workspace/Venus");
		System.setProperty("upload-image-path-dir", "C:/Users/Administrator/Desktop/lu_stock_admin/");
		
		SpringApplication.run(App.class, args);
	}
	
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(App.class);
	}
}
