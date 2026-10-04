export const codeSnippets: string[] = [
  `System.out.println("Hello World");`,

  `for (int i = 1; i <= 5; i++)`,

  `List<String> result = listOfLists.stream().flatMap(List::stream).filter(s -> s.startsWith("S")).map(String::toUpperCase).distinct().sorted().peek(s -> intermediateResults.add(s)).collect(Collectors.toList()); `,

  `int next = first + second; first = second; second = next;`,

  `Optional.ofNullable(user).map(User::getAddress).map(Address::getCity).orElse("Unknown City");`,

  
]
