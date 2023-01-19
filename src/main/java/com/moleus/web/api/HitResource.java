package com.moleus.web.api;

import com.moleus.web.dto.HitCoordinatesDto;
import com.moleus.web.service.stratagies.hits.AddHitAction;
import com.moleus.web.service.stratagies.hits.DeleteHitsAction;
import com.moleus.web.service.stratagies.hits.GetHitsAction;
import com.moleus.web.util.RestUtil;
import jakarta.annotation.security.RolesAllowed;
import jakarta.ejb.EJB;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;

@RolesAllowed({"Authorised"})
@Path("/hits")
@ApplicationScoped
public class HitResource {
    @EJB GetHitsAction getHitsAction;
    @EJB AddHitAction addHitAction;
    @EJB DeleteHitsAction deleteHitsAction;

    @POST
    @Path("/add")
    public Response addHits(@Valid HitCoordinatesDto hitCoordinates) {
        var result = addHitAction.execute(hitCoordinates);
        return RestUtil.fromActionResult(result);
    }

    @DELETE
    @Path("/")
    public Response deleteHits() {
        var result = deleteHitsAction.execute();
        return RestUtil.fromActionResult(result);
    }

    @GET
    @Path("/")
    public Response getHits(@QueryParam("page") @DefaultValue(value = "1") int page,
                            @QueryParam("per_page") @DefaultValue(value = "17") int perPage,
                            @QueryParam("sort_reverse") @DefaultValue(value = "true") boolean sortReverse) {
        var result = getHitsAction.execute(page, perPage, sortReverse);
        return RestUtil.fromActionResult(result);
    }
}
