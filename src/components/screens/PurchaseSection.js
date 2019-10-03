import React from 'react';
import { Table, Button } from 'reactstrap';

const purchaseSection = () => {
    const newbook = {
        books: { id: 1, title: 'The wonderland Book', rating: '5' }
    };

    return (
        <div className='container'>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Rating</th>
                    </tr>
                </thead>

                <tbody>
                    <tr key={newbook.books.id}>
                        <td>{newbook.books.id}</td>
                        <td>{newbook.books.title}</td>
                        <td>{newbook.books.rating}</td>
                        <td>
                            <Button color='success' size='sm' className='mr-2'>
                                Pay
                            </Button>
                            <Button color='danger' size='sm' className='mr-2'>
                                Delete
                            </Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
};

export default purchaseSection;
