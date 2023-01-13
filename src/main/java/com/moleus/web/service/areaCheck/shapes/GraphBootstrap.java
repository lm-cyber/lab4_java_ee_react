package com.moleus.web.service.areaCheck.shapes;

import com.moleus.web.service.areaCheck.quadrant.Quadrant;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.inject.Produces;


@ApplicationScoped
public class GraphBootstrap {
    @Produces @ApplicationScoped
    public Graph getShapesGraph() {
        Graph graph = new Graph();
        graph.addShape(new Rectangle(Quadrant.SECOND, 1f, 1f));
        graph.addShape(new Triangle(Quadrant.THIRD, 2, 1));
        graph.addShape(new Circle(Quadrant.FORTH, 0.5f));
        return graph;
    }
}
