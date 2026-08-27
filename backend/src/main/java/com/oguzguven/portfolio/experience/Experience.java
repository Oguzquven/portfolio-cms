package com.oguzguven.portfolio.experience;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "experiences")
public class Experience {
    @Id @GeneratedValue private UUID id;
    @Column(nullable = false, length = 120) private String company;
    @Column(nullable = false, length = 120) private String role;
    @Column(name = "start_date", nullable = false, length = 7) private String startDate;
    @Column(name = "end_date", nullable = false, length = 7) private String endDate;
    @Column(nullable = false, length = 2000) private String description;
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "experience_technologies", joinColumns = @JoinColumn(name = "experience_id"))
    @OrderColumn(name = "display_order")
    @Column(name = "technology", nullable = false, length = 60)
    private List<String> technologies = new ArrayList<>();
    @Column(name = "logo_url", length = 10_000_000) private String logoUrl;
    @Column(nullable = false) private boolean published;
    @Column(name = "display_order", nullable = false) private int displayOrder;
    @Column(name = "created_at", nullable = false, updatable = false) private Instant createdAt;
    @Column(name = "updated_at", nullable = false) private Instant updatedAt;

    protected Experience() {}

    public Experience(String company, String role, String startDate, String endDate, String description,
                      List<String> technologies, String logoUrl, boolean published, int displayOrder) {
        update(company, role, startDate, endDate, description, technologies, logoUrl, published, displayOrder);
        createdAt = Instant.now();
    }

    public void update(String company, String role, String startDate, String endDate, String description,
                       List<String> technologies, String logoUrl, boolean published, int displayOrder) {
        this.company = company; this.role = role; this.startDate = startDate; this.endDate = endDate;
        this.description = description; this.technologies = new ArrayList<>(technologies);
        this.logoUrl = logoUrl; this.published = published; this.displayOrder = displayOrder;
        updatedAt = Instant.now();
    }

    public void togglePublished() { published = !published; updatedAt = Instant.now(); }
    public UUID getId() { return id; } public String getCompany() { return company; }
    public String getRole() { return role; } public String getStartDate() { return startDate; }
    public String getEndDate() { return endDate; } public String getDescription() { return description; }
    public List<String> getTechnologies() { return List.copyOf(technologies); }
    public String getLogoUrl() { return logoUrl; } public boolean isPublished() { return published; }
    public int getDisplayOrder() { return displayOrder; } public Instant getCreatedAt() { return createdAt; }
    public Instant getUpdatedAt() { return updatedAt; }
}
