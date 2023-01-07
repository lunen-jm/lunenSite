var docs = [
{{ range $index, $page := (where .Site.Pages "Section" "docs") -}}
  {
    id: {{ $index }},
    title: "{{ .Title }}",
    description: "{{ .Params.description }}",
    href: "{{ .URL | relURL }}"
  },
{{ end -}}
];

var vba = [
  {{ range $index, $page := (where .Site.Pages "Section" "vba") -}}
    {
      id: {{ $index }},
      title: "{{ .Title }}",
      description: "{{ .Params.description }}",
      href: "{{ .URL | relURL }}"
    },
  {{ end -}}
  ];