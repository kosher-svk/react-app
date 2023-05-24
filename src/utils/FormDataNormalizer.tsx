import { StandingOrder } from '../interfaces/standingOrder.interface';

const formDataNormalizer = (formData?: StandingOrder): StandingOrder => {
  const normalizedStandingOrder = {
    standingOrderId: formData?.standingOrderId,
    amount: formData?.amount,
    name: formData?.name || '',
    accountNumber: formData?.accountNumber || '',
    variableSymbol: formData?.variableSymbol || '',
    specificSymbol: formData?.specificSymbol || '',
    constantSymbol: formData?.constantSymbol || '',
    interval: formData?.interval || '',
    note: formData?.note || '',
    intervalId: formData?.intervalId || 1,
    intervalSpecification: formData?.intervalSpecification || 1,
    validFrom: formData?.validFrom || '',
    nextRealizationDate: formData?.nextRealizationDate || '',
  };
  return normalizedStandingOrder;
};

export default formDataNormalizer;
