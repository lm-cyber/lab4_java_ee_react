package com.moleus.web.dto;

import java.util.List;

public record PageWithHitsDto(long page, long perPage, long total, long totalPages, List<HitResultDto> data) {
}
