package com.moleus.web.service.stratagies.hits.logic;

import java.text.ParseException;

public interface Calculator<I, O> {
    O runCalculation(I coordinates) throws ParseException;
}
