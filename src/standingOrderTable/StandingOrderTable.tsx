import StandingOrderTableFooter from './StandingOrderTableFooter';
import StandingOrderTableHeader from './StandingOrderTableHeader';
import StandingOrderTableList from './StandingOrderTableList';

import transactions from './transactions.json';

function StandingOrderTable(props: any) {
  return (
    <div>
      <table className='table'>
        <StandingOrderTableHeader />

        <StandingOrderTableList transactions={transactions} />

        <tfoot>
          <StandingOrderTableFooter />
        </tfoot>
      </table>
    </div>
  );
}

export default StandingOrderTable;
