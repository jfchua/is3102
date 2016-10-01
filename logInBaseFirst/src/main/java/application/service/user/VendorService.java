package application.service.user;

import java.util.Optional;
import java.util.Set;

import application.domain.ClientOrganisation;
import application.domain.Vendor;

public interface VendorService {
boolean createVendor(ClientOrganisation client, String email, String name, String description, String contact);
	
Set<Vendor> getAllVendors(ClientOrganisation client);
	
boolean deleteVendor(ClientOrganisation client, long id);
	
boolean editVendor(long id, String email, String name, String description, String contact);	

Optional<Vendor> getVendorById(long id);
}
