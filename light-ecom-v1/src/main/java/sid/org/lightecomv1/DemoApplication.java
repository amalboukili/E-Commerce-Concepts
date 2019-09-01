package sid.org.lightecomv1;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

import net.bytebuddy.utility.RandomString;
import sid.org.lightecomv1.dao.CategoryRepository;
import sid.org.lightecomv1.dao.ProductRepository;
import sid.org.lightecomv1.entities.Category;
import sid.org.lightecomv1.entities.Product;

@SpringBootApplication
public class DemoApplication implements CommandLineRunner {
	@Autowired
	private ProductRepository productRepository;
	@Autowired
	private CategoryRepository categoryRepository;

	@Autowired
	private RepositoryRestConfiguration repositoryRestConfiguration;

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		repositoryRestConfiguration.exposeIdsFor(Product.class, Category.class);

		categoryRepository.save(new Category(null, "Computers", null, null, null));
		categoryRepository.save(new Category(null, "Printers", null, null, null));
		categoryRepository.save(new Category(null, "Smart phones", null, null, null));

		Random rnd = new Random();
		categoryRepository.findAll().forEach(c -> {
			// Add 10 roduct in each category
			for (int i = 0; i < 10; i++) {
				Product p = new Product();
				p.setName(RandomString.make(18));
				p.setCurrentprice(100 + rnd.nextInt(10000));
				p.setAvailable(rnd.nextBoolean());
				p.setPromotion(rnd.nextBoolean());
				p.setSelected(rnd.nextBoolean());
				p.setPhotoName("unknown.png");
				p.setCategory(c);
				productRepository.save(p);
			}
				

			

		});
	}

}
