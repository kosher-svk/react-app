import TableFooter from './TableFooter';
import TableHeader from './TableHeader';
import TableRow from './rowComponent/TableRow';
import transactions from './transactions.json';

function Table(props: any) {
  debugger;
  return (
    <div>
      <table className='table'>
        <TableHeader />
        <tbody>
          {transactions.map((transaction) => {
            return <TableRow {...transaction} key={transaction.id} />;
          })}
        </tbody>
        <tfoot>
          <TableFooter />
        </tfoot>
      </table>
    </div>
  );
}

export default Table;
