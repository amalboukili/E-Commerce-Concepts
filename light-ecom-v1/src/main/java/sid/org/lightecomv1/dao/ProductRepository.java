package sid.org.lightecomv1.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Query;
// import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import sid.org.lightecomv1.entities.Product;

@CrossOrigin("*")
@RepositoryRestResource
public interface ProductRepository extends JpaRepository<Product, Long> {

    //Get only selected products
    @RestResource(path = "/selectedProducts")
    public List<Product> findBySelectedIsTrue();

    //Search Product
    //Methode 1
    @RestResource(path = "/productsByKeyword")
    public List<Product> findByNameContains(String mc);

    //Methode 2
    // @RestResource(path = "/productsByKeyword")
    // @Query("select p from Product p where p.name like : x")
    // public List<Product> chercher(@Param("x") String mc);



    @RestResource(path = "/promoProducts")
    public List<Product> findByPromotionIsTrue();
    
    @RestResource(path = "/dispoProducts")
    public List<Product> findByAvailableIsTrue();
}