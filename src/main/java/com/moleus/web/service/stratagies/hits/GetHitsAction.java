package com.moleus.web.service.stratagies.hits;

import com.moleus.web.dao.HitResultsRepository;
import com.moleus.web.dto.HitResultDto;
import com.moleus.web.dto.PageWithHitsDto;
import com.moleus.web.dto.ResponsePayload;
import com.moleus.web.model.HitResult;
import com.moleus.web.service.mapping.HitResultMapper;
import com.moleus.web.service.stratagies.ActionResult;
import com.moleus.web.service.stratagies.ActionStatus;
import com.moleus.web.service.stratagies.ParametricAction;
import com.moleus.web.service.stratagies.auth.UserProvider;
import jakarta.ejb.EJB;
import jakarta.ejb.LocalBean;
import jakarta.ejb.Stateless;
import lombok.extern.log4j.Log4j2;

import java.util.Comparator;
import java.util.List;
import java.util.PrimitiveIterator;
import java.util.stream.IntStream;

import static java.lang.Math.max;
import static java.lang.Math.min;

@Stateless
@LocalBean
@Log4j2
public class GetHitsAction {
    @EJB
    private UserProvider userProvider;
    @EJB
    private HitResultsRepository hitsProvider;

    public ActionResult execute(int page, int perPage, boolean sortReverse) {
        var hits = hitsProvider.findByUserId(userProvider.getCurrentUser().getId());
        var hitResultDtos = mapWithOrderedIds(hits);
        if (sortReverse) {
            hitResultDtos = hitResultDtos.stream().sorted(Comparator.comparing(HitResultDto::getId).reversed()).toList();
        }
        PageWithHitsDto pageWithHits = filterSinglePage(hitResultDtos, page, perPage);
        return new ActionResult(ActionStatus.OK, ResponsePayload.okWithPayload(pageWithHits));
    }

    private List<HitResultDto> mapWithOrderedIds(List<HitResult> hits) {
        PrimitiveIterator.OfInt ids = IntStream.range(0, hits.size()).iterator();
        var hitsDto = hits.stream().map(HitResultMapper.INSTANCE::toDto).toList();
        hitsDto.forEach(hit -> hit.setId(ids.next()));
        return hitsDto;
    }

    private PageWithHitsDto filterSinglePage(List<HitResultDto> allHits, int page, int perPage) {
        int total = allHits.size();
        int totalPages = (total + perPage - 1) / perPage;
        int startIndex = min(perPage * (page - 1), allHits.size());
        int toIndex = min(startIndex + perPage, allHits.size());
        return new PageWithHitsDto(page, perPage, total, totalPages, allHits.subList(startIndex, toIndex));
    }
}
