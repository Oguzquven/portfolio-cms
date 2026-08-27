package com.oguzguven.portfolio.project;

import jakarta.persistence.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "projects")
public class Project {
    @Id @GeneratedValue
    private UUID id;

    @Column(nullable = false, length = 120)
    private String title;

    @Column(nullable = false, length = 80)
    private String type;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "project_technologies", joinColumns = @JoinColumn(name = "project_id"))
    @OrderColumn(name = "display_order")
    @Column(name = "technology", nullable = false, length = 60)
    private List<String> technologies = new ArrayList<>();

    @Column(nullable = false, length = 2000)
    private String description;

    @Column(name = "project_url", length = 500)
    private String projectUrl;

    @Column(name = "mockup_type", nullable = false, length = 40)
    private String mockupType;

    @Column(name = "cover_image_url", length = 10_000_000)
    private String coverImageUrl;

    @Column(nullable = false)
    private boolean published;

    @Column(name = "display_order", nullable = false)
    private int displayOrder;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    protected Project() {}

    public Project(String title, String type, List<String> technologies, String description,
                   String projectUrl, String mockupType, String coverImageUrl,
                   boolean published, int displayOrder) {
        update(title, type, technologies, description, projectUrl, mockupType,
                coverImageUrl, published, displayOrder);
        this.createdAt = Instant.now();
    }

    public void update(String title, String type, List<String> technologies, String description,
                       String projectUrl, String mockupType, String coverImageUrl,
                       boolean published, int displayOrder) {
        this.title = title;
        this.type = type;
        this.technologies = new ArrayList<>(technologies);
        this.description = description;
        this.projectUrl = projectUrl;
        this.mockupType = mockupType;
        this.coverImageUrl = coverImageUrl;
        this.published = published;
        this.displayOrder = displayOrder;
        this.updatedAt = Instant.now();
    }

    public void togglePublished() {
        published = !published;
        updatedAt = Instant.now();
    }

    public UUID getId() { return id; }
    public String getTitle() { return title; }
    public String getType() { return type; }
    public List<String> getTechnologies() { return List.copyOf(technologies); }
    public String getDescription() { return description; }
    public String getProjectUrl() { return projectUrl; }
    public String getMockupType() { return mockupType; }
    public String getCoverImageUrl() { return coverImageUrl; }
    public boolean isPublished() { return published; }
    public int getDisplayOrder() { return displayOrder; }
    public Instant getCreatedAt() { return createdAt; }
    public Instant getUpdatedAt() { return updatedAt; }
}
