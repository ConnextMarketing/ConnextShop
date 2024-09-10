import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NeuronVisualizerComponent } from './neuron-visualizer.component';

describe('NeuronVisualizerComponent', () => {
  let component: NeuronVisualizerComponent;
  let fixture: ComponentFixture<NeuronVisualizerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NeuronVisualizerComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NeuronVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
