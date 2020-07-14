import assert from 'assert';
import app from '../../src/app';

describe('\'todo\' service', () => {
  const todoData = {
    title: 'Test Title',
    completed: false
  };
  let createdTodo;
  const service = app.service('todo');

  it('registered the service', () => {
    assert.ok(service, 'Registered the service');
  });

  it('create todo', (done) => {
    service.create(todoData).then((newCreatedTodo) => {
      assert.equal(newCreatedTodo.title, todoData.title);
      createdTodo = newCreatedTodo;
      done();
    });
  });

  it('find todo', (done) => {
    service.find({title: todoData.title}).then((foundTodo:any) => {
      assert.equal(foundTodo.data[0].title, todoData.title);
      done();
    });
  });

  it('update todo', (done) => {
    const updateTitle = 'Test Title modified';
    service.update(createdTodo.id, { title: updateTitle }).then((updatedTodo) => {
      assert.equal(updatedTodo.title, updateTitle);
      done();
    });
  });

  it('delete todo', (done) => {
    service.remove(createdTodo.id).then((deleteTodo) => {
      assert.equal(deleteTodo.id, createdTodo.id);
      done();
    });
  });

  it('find all todo', (done) => {
    service.find().then((allTodo: any) => {
      assert.equal(allTodo.total, 0);
      done();
    });
  });

});
