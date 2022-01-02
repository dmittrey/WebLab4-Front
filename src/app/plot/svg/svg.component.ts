import {Component, OnInit} from '@angular/core';

import {SVG} from '@svgdotjs/svg.js';
import * as $ from 'jquery';

import {Point} from "../../utility/Point";
import {Coordinates} from "../../utility/Coordinates";

@Component({
  selector: 'app-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.scss']
})
export class SvgComponent implements OnInit {

  /* Размер компонента */
  private WIDTH = 400;

  /* Цвета компонентов плоскости */
  private AXES_COLOR = '#a2a2a2';
  private CIRCLE_COLOR = '#234a23';
  private TRIANGLE_COLOR = '#707023';
  private RECTANGLE_COLOR = '#232370';

  /* Коэф */
  private scale = 0.014;

  /* Локальное хранилище попаданий */
  private attemptsArray: Point[] = [];

  private DEFAULT_R = 3;

  private SVG: any;

  constructor() {
    window.addEventListener(`resize`, () => {
      this.resize();
      $('#plot').empty();
      this.drawPlot();
    }, false);
  }

  resize() {
    // @ts-ignore
    this.WIDTH = $('#plot').width();
  }

  ngOnInit() {
    this.resize();
    this.drawPlot();
  }

  // Инициализация плоскости
  drawPlot() {
    console.log("Starting drawing plot!")
    this.SVG = SVG()
      .addTo('#plot')
      .size(this.WIDTH, this.WIDTH);

    //todo странная логика для первой прорисовки
    if (this.attemptsArray.length === 0) {
      this.initPlot();
    } else {
      this.drawPlotWithPoints(this.attemptsArray);
    }
  }

// Отрисовка плоскости без точек
  initPlot() {
    console.log("Строим без точек.")
    this.drawArea(this.DEFAULT_R);
    this.drawAxes();
    this.drawAxesScaleLabels(this.DEFAULT_R);
    this.drawRValue(this.DEFAULT_R);
  }

  // Отрисовка плоскости с точками
  drawPlotWithPoints(attemptsArray: any[]) {
    console.log("Строим вместе с точками.")
    this.drawArea(this.DEFAULT_R);
    this.drawAxes();
    this.drawAxesScaleLabels(this.DEFAULT_R);
    attemptsArray.forEach(
      point => this.drawPoint(point)
    );
    this.drawRValue(this.DEFAULT_R);
  }

  /* Конвертация из координат в значения */
  convertToCoordinateX(xValue: number) {
    return (this.WIDTH / 2) + xValue / (2 * this.scale);
  }

  convertToCoordinateY(yValue: number) {
    return (this.WIDTH / 2) - yValue / (2 * this.scale);
  }

  /* Конвертация из значений в координаты */
  convertToValueX(xCoordinate: number) {
    return (xCoordinate - (this.WIDTH / 2)) * 2 * this.scale;
  }

  convertToValueY(yCoordinate: number) {
    return ((this.WIDTH / 2) - yCoordinate) * 2 * this.scale;
  }

  /* Утилитарные методы для построения плоскости */

  // noinspection TypeScriptValidateJSTypes
  drawAxes() {
    const arrowSize = 10;

    // x axe
    this.SVG.line(0, (this.WIDTH / 2), this.WIDTH, (this.WIDTH / 2)).stroke({width: 1, color: this.AXES_COLOR});

    // x axe arrow
    let triangleX = (this.WIDTH - arrowSize) + ','
      + (this.WIDTH / 2 - arrowSize / 2) + ' ' + (this.WIDTH - arrowSize) + ','
      + (this.WIDTH / 2 + arrowSize / 2) + ' ' + (this.WIDTH) + ','
      + (this.WIDTH / 2);
    //todo Какого хуя?
    // noinspection TypeScriptValidateJSTypes
    this.SVG.polygon(triangleX).fill(this.AXES_COLOR);

    // x axe label
    this.SVG.text('x').font({
      size: 16,
      family: 'Menlo, sans-serif',
      anchor: 'end',
      fill: this.AXES_COLOR
    }).x(this.WIDTH - 2 * arrowSize).y(this.WIDTH / 2 - 2.5 * arrowSize);

    // y axe
    this.SVG.line(this.WIDTH / 2, 0, this.WIDTH / 2, this.WIDTH).stroke({width: 1, color: this.AXES_COLOR});

    // y axe arrow
    const triangleY = (this.WIDTH / 2 - arrowSize / 2) + ',' + (arrowSize) + ' ' +
      (this.WIDTH / 2 + arrowSize / 2) + ',' + (arrowSize) + ' ' +
      (this.WIDTH / 2) + ',' + (0);
    // noinspection TypeScriptValidateJSTypes
    this.SVG.polygon(triangleY).fill(this.AXES_COLOR);

    // y axe label
    this.SVG.text('y').font({
      size: 16,
      family: 'Menlo, sans-serif',
      anchor: 'end',
      fill: this.AXES_COLOR
    }).x(this.WIDTH / 2 + 1.5 * arrowSize).y(arrowSize / 2);
  }

  drawScaleLabel = (xStart: number, xStop: number, yStart: number, yStop: number, labelX: number, labelY: number, label: string) => {

    this.SVG.line(this.convertToCoordinateX(xStart), this.convertToCoordinateY(yStart),
      this.convertToCoordinateX(xStop), this.convertToCoordinateY(yStop))
      .stroke({
        width: 2,
        color: this.AXES_COLOR
      });

    this.SVG.text(label).font({
      size: 16,
      family: 'Menlo, sans-serif',
      anchor: 'end',
      fill: this.AXES_COLOR
    }).x(this.convertToCoordinateX(labelX)).y(this.convertToCoordinateY(labelY));
  }

  drawRValue(rValue: number) {
    console.log('Start drawing R value:' + rValue);

    this.SVG.text('R = ' + rValue.toFixed(3)).font({
      size: 16,
      family: 'Menlo, sans-serif',
      anchor: 'end',
      fill: this.AXES_COLOR
    }).x(this.WIDTH - 77).y(this.WIDTH - 50);
  }

  drawAxesScaleLabels(rValue: number) {
    let hatchLen = 0.1;

    console.log("R value while drawing labels: " + rValue);

    //x axis labels
    this.drawScaleLabel(-rValue, -rValue, hatchLen, -hatchLen, -rValue, -2 * hatchLen, "-R");
    this.drawScaleLabel(-rValue / 2, -rValue / 2, hatchLen, -hatchLen, -rValue / 2, -2 * hatchLen, "-R/2");
    this.drawScaleLabel(rValue / 2, rValue / 2, hatchLen, -hatchLen, rValue / 2, -2 * hatchLen, "R/2");
    this.drawScaleLabel(rValue, rValue, hatchLen, -hatchLen, rValue, -2 * hatchLen, "R");

    //y axis labels
    this.drawScaleLabel(hatchLen, -hatchLen, -rValue, -rValue, -4 * hatchLen, -rValue, "-R");
    this.drawScaleLabel(hatchLen, -hatchLen, -rValue / 2, -rValue / 2, -4 * hatchLen, -rValue / 2, "-R/2");
    this.drawScaleLabel(hatchLen, -hatchLen, rValue / 2, rValue / 2, -4 * hatchLen, rValue / 2, "R/2");
    this.drawScaleLabel(hatchLen, -hatchLen, rValue, rValue, -4 * hatchLen, rValue, "R");
  }

  drawArea = (rValue: number) => {
    let circlePath = 'M ' + (this.convertToCoordinateX(0)) + ', ' + (this.convertToCoordinateY(rValue)) + ' ' +
      'A' + rValue / (2 * this.scale) + ', ' + rValue / (2 * this.scale) + ' ' +
      '90 0,1 ' + (this.convertToCoordinateX(rValue)) + ', ' + (this.convertToCoordinateY(0)) +
      ' L ' + (this.convertToCoordinateX(0)) + ',' + (this.convertToCoordinateY(0)) + ' Z';

    let triangle = (this.convertToCoordinateX(0)) + ', ' + (this.convertToCoordinateY(0)) + ' ' +
      (this.convertToCoordinateX(-rValue)) + ', ' + (this.convertToCoordinateY(0)) + ' ' +
      (this.convertToCoordinateX(0)) + ', ' + (this.convertToCoordinateY(-rValue / 2));

    this.SVG.path(circlePath)
      .fill(this.CIRCLE_COLOR)
      .x(this.convertToCoordinateX(0))
      .y(this.convertToCoordinateY(rValue));

    this.SVG.rect(rValue / (4 * this.scale), rValue / (2 * this.scale))
      .fill(this.RECTANGLE_COLOR)
      .x(this.convertToCoordinateX(0))
      .y(this.convertToCoordinateY(-rValue / 2 * this.scale));

    // noinspection TypeScriptValidateJSTypes
    this.SVG.polygon(triangle)
      .fill(this.TRIANGLE_COLOR);
  }

  drawPoint = (point: Point) => {
    let color = (point.hitResult) ? '#0f0' : '#f00';

    this.SVG.circle(point.coordinates.rvalue * 2)
      .fill(color)
      .x(this.convertToCoordinateX(point.coordinates.xvalue) - point.coordinates.rvalue)
      .y(this.convertToCoordinateY(point.coordinates.yvalue) - point.coordinates.rvalue);
  }

  getCoords(event: MouseEvent): Coordinates {
    const rect = $('#plot').offset();
    return {
      // @ts-ignore
      xvalue: this.convertToValueX(event.pageX - rect?.left),
      // @ts-ignore
      yvalue: this.convertToValueY(event.pageY - rect?.top),
      rvalue: this.DEFAULT_R
    }
  }

  switchRadius(rValue: number): void {
    console.log("Radius switched to: " + rValue);
    $('#plot').empty();

    if (rValue > 0) {
      this.DEFAULT_R = rValue;
      this.drawPlot();
    }
  }

  addPoint = (point: Point) => {
    this.attemptsArray.push(point);
  }

  resetDots(newAttemptsArray: Point[]) {
    if (newAttemptsArray.length !== 0) {
      this.attemptsArray = [];
      newAttemptsArray.forEach(dot => {
        this.attemptsArray.push(dot);
      })
    }
  }

  cleanPlot() {
    $('#plot').empty();
    this.attemptsArray = [];
    this.drawPlot();
  }

}
