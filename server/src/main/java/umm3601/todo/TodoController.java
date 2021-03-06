package umm3601.todo;

import com.mongodb.MongoException;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.bson.types.ObjectId;

import java.util.Iterator;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static com.mongodb.client.model.Filters.eq;

/**
 * Controller that manages requests for info about todos.
 */
public class TodoController {

  private final MongoCollection<Document> todoCollection;

  /**
   * Construct a controller for todos.
   *
   * @param database the database containing todo data
   */
  public TodoController(MongoDatabase database) {todoCollection = database.getCollection("todos");}

  /**
   * Helper method that gets a single todo specified by the `id`
   * parameter in the request.
   *
   * @param id the Mongo ID of the desired todo
   * @return the desired todo as a JSON object if the todo with that ID is found,
   * and `null` if no todo with that ID is found
   */
  public String getTodo(String id) {
    FindIterable<Document> jsonTodos
      = todoCollection
      .find(eq("id", new ObjectId(id)));

    Iterator<Document> iterator = jsonTodos.iterator();
    if (iterator.hasNext()) {
      Document todo = iterator.next();
      return todo.toJson();
    } else {
      // We didn't find the desired todo
      return null;
    }
  }


  /**
   * Helper method which iterates through the collection, receiving all
   * documents if no query parameter is specified. If the age query parameter
   * is specified, then the collection is filtered so only documents of that
   * specified age are found.
   *
   * @param queryParams the query parameters from the request
   * @return an array of Todos in a JSON formatted string
   */
  public String getTodos(Map<String, String[]> queryParams) {

    Document filterDoc = new Document();

    if (queryParams.containsKey("owner")) {
      String targetOwner = (queryParams.get("owner"))[0];
      Document contentRegQuery = new Document();
      contentRegQuery.append("$regex", targetOwner);
      contentRegQuery.append("$options", "i");
      filterDoc = filterDoc.append("owner", targetOwner);
    }

    if (queryParams.containsKey("category")) {
      String targetContent = (queryParams.get("category")[0]);
      Document contentRegQuery = new Document();
      contentRegQuery.append("$regex", targetContent);
      contentRegQuery.append("$options", "i");
      filterDoc = filterDoc.append("category", contentRegQuery);
    }
    if (queryParams.containsKey("body")) {
      String targetBody = (queryParams.get("body"))[0];
      Document contentRegQuery = new Document();
      contentRegQuery.append("$regex", targetBody);
      contentRegQuery.append("$options", "i");
      filterDoc = filterDoc.append("body", targetBody);
    }

    if (queryParams.containsKey("status")) {
      String targetStatus = (queryParams.get("status"))[0];
      Document contentRegQuery = new Document();
      contentRegQuery.append("$regex", targetStatus);
      contentRegQuery.append("$options", "i");
      filterDoc = filterDoc.append("status", targetStatus);
    }

    //FindIterable comes from mongo, Document comes from Gson
    FindIterable<Document> matchingTodos = todoCollection.find(filterDoc);

    return serializeIterable(matchingTodos);
  }

  private String serializeIterable(Iterable<Document> documents) {
    return StreamSupport.stream(documents.spliterator(), false)
      .map(Document::toJson)
      .collect(Collectors.joining(", ", "[", "]"));
  }


  /**
   * Helper method which appends received todo information to the to-be added document
   *
   * @param owner the name of the new todo
   * @param status the age of the new todo
   * @param category the company the new todo works for
   * @param body the email of the new todo
   * @return boolean after successfully or unsuccessfully adding a todo
   */
  public String addNewTodo(String owner, boolean status, String category, String body) {

    Document newTodo = new Document();
    newTodo.append("owner", owner);
    newTodo.append("status", status);
    newTodo.append("category", category);
    newTodo.append("body", body);

    try {
      todoCollection.insertOne(newTodo);
      ObjectId id = newTodo.getObjectId("id");
      System.err.println("Successfully added new todo [_id=" + id + ", owner=" + owner + ", status=" + status + ", category=" + category + " body=" + body + ']');
      return id.toHexString();
    } catch (MongoException me) {
      me.printStackTrace();
      return null;
    }
  }
}
