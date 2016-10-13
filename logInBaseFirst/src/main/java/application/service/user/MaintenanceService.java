package application.service.user;
import java.util.Date;
import java.util.Optional;
import java.util.Set;

import application.domain.ClientOrganisation;
import application.domain.Maintenance;
import application.domain.MaintenanceSchedule;
import application.domain.Unit;

public interface MaintenanceService {
	boolean createMaintenance(ClientOrganisation client, String unitId, String vendorId, Date start, Date end, String description);
	
	boolean editMaintenance(ClientOrganisation client, long id, String unitsId, String vendorId, Date start, Date end, String description);
	
	boolean deleteMaintenance(ClientOrganisation client, long id);
	
	Set<Maintenance> getMaintenanceByUnitId(long unitId);

	String getUnitsId(long id);
	
	Optional<Maintenance> getMaintenanceById(long id);
	
	String getVendorsId(long id);
	
	Set<Maintenance> getAllMaintenance(ClientOrganisation client);
	
	boolean checkMaintenance(ClientOrganisation client, long id);
	
	boolean checkUnit(ClientOrganisation client, long unitId);
	
	Set<MaintenanceSchedule> getMaintenanceSchedule(ClientOrganisation client, long id);
	
}
