export interface StandingOrder {
  standingOrderId?: number;
  amount?: number;
  name?: string;
  accountNumber?: string;
  variableSymbol?: string;
  specificSymbol?: string;
  constantSymbol?: string;
  interval?: string;
  note?: string;
  intervalId?: number;
  intervalSpecification?: number;
  validFrom?: string | moment.Moment;
  nextRealizationDate?: string | moment.Moment;
}
