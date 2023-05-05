import { StandingOrder } from '../interfaces/standingOrder.interface';

const formDataNormalizer = (formData: StandingOrder): StandingOrder => {
  const normalizedStandingOrder = {
    standingOrderId: formData?.standingOrderId || 0,
    amount: formData?.amount || 0,
    name: formData?.name || '',
    accountNumber: formData?.accountNumber || '',
    variableSymbol: formData?.variableSymbol || '',
    specificSymbol: formData?.specificSymbol || '',
    constantSymbol: formData?.constantSymbol || '',
    interval: formData?.interval || '',
    note: formData?.note || '',
    intervalId: formData?.intervalId || 0,
    intervalSpecification: formData?.intervalSpecification || 0,
    validFrom: formData?.validFrom || '',
    nextRealizationDate: formData?.nextRealizationDate || '',
  };
  return normalizedStandingOrder;
};

export default formDataNormalizer;
